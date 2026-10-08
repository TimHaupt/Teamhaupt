// Teamfoto freistellen und auf einen sauberen Wandhintergrund setzen.
//
// Entstanden fuer die Fotos vom Shooting vor der gruenen HDI-Wand (10/2026):
// Hinter den Koepfen stehen dort der HDI-Schriftzug und "#TeamHaupt", die auf
// der Website nicht ins Bild sollen. Das Skript nutzt die Freistellung von
// macOS (Vision, dieselbe wie in Fotos.app) – das Foto verlaesst den Rechner
// nicht. Braucht macOS 14 oder neuer.
//
// Ablauf fuer ein neues Teamfoto:
//
//   1. swift scripts/teamfoto-freistellen.swift original.jpg frei.png 525 690 20 140
//        525 690  = ein Punkt mitten im Gesicht (x y, Pixel ab oben links).
//                   Damit waehlt das Skript die Person, falls Vision mehrere
//                   Objekte erkennt.
//        20 140   = waagerechter Streifen am linken Rand OHNE Schrift. Seine
//                   Farbe wird zeilenweise gemittelt und ueber die ganze
//                   Breite gezogen; so bleibt der Lichtverlauf der Wand.
//      Neben frei.png entsteht frei.maske.png zur Kontrolle.
//
//   2. Zuschneiden auf das Format der Teamseite, 520 x 650 (4:5):
//        sips -s format jpeg -s formatOptions 88 frei.png \
//             -c 650 520 --cropOffset <oben> <links> --out name-2026.jpg
//      Massstab der uebrigen Fotos: Haaransatz oben bei rund 10 % der Hoehe,
//      Augen bei rund 37–42 %. Bei Swenja (Original 1403 x 2000) passte das
//      ohne Hochrechnen mit cropOffset 397 265.
//
//   3. Unter neuem Dateinamen nach public/img/team/ legen und in
//      src/lib/site.ts eintragen. Neuer Name statt Ueberschreiben, damit
//      Browser nicht stundenlang das alte Bild aus dem Zwischenspeicher zeigen.
//
// Die Maske wird um 2 px eingezogen: Sonst tragen die Randpixel der Haare noch
// die Farbe der hellen Buchstaben dahinter und bilden einen hellen Saum.

import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
let quelle = URL(fileURLWithPath: a[1]), ziel = URL(fileURLWithPath: a[2])
let gx = Double(a[3])!, gy = Double(a[4])!
let s0 = CGFloat(Double(a[5])!), s1 = CGFloat(Double(a[6])!)

guard let bild = CIImage(contentsOf: quelle, options: [.applyOrientationProperty: true]) else { fatalError("Bild nicht lesbar") }
let W = bild.extent.width, H = bild.extent.height

// 1. Vordergrund-Objekte erkennen
let handler = VNImageRequestHandler(ciImage: bild)
let anfrage = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([anfrage])
guard let erg = anfrage.results?.first else { fatalError("Kein Vordergrund erkannt") }
print("Erkannte Objekte:", erg.allInstances.count)

// Objekt unter dem Gesicht bestimmen (Instanzmaske hat eigene, kleinere Auflösung)
let im = erg.instanceMask
CVPixelBufferLockBaseAddress(im, .readOnly)
let mw = CVPixelBufferGetWidth(im), mh = CVPixelBufferGetHeight(im)
let zeile = CVPixelBufferGetBytesPerRow(im)
let basis = CVPixelBufferGetBaseAddress(im)!.assumingMemoryBound(to: UInt8.self)
let mx = Int(gx / Double(W) * Double(mw)), my = Int(gy / Double(H) * Double(mh))
var label = Int(basis[my * zeile + mx])
// Zaehlen, wie gross jedes Objekt ist – zur Kontrolle
var anzahl = [Int: Int]()
for y in 0..<mh { for x in 0..<mw { anzahl[Int(basis[y * zeile + x]), default: 0] += 1 } }
CVPixelBufferUnlockBaseAddress(im, .readOnly)
print("Pixel je Objekt (0 = Hintergrund):", anzahl.sorted { $0.key < $1.key })
if label == 0 { fatalError("Unter dem Gesichtspunkt liegt kein Objekt – Koordinaten pruefen") }
print("Gewaehlt: Objekt \(label)")

let maskePuffer = try erg.generateScaledMaskForImage(forInstances: IndexSet(integer: label), from: handler)
let roh = CIImage(cvPixelBuffer: maskePuffer)
// Maske um ~2 px einziehen: Die Randpixel der Haare enthalten sonst noch die
// Farbe des alten Hintergrunds (helle Buchstaben) und bilden einen Saum.
// Danach leicht weichzeichnen, damit die Kante nicht ausgefranst wirkt.
let einziehen = CIFilter.morphologyMinimum()
einziehen.inputImage = roh
einziehen.radius = 2
let maske = einziehen.outputImage!.clampedToExtent().applyingGaussianBlur(sigma: 1.2).cropped(to: roh.extent)

// 2. Hintergrund: Streifen am linken Rand (ohne Schrift) zeilenweise mitteln
//    und auf volle Breite ziehen -> senkrechter Verlauf wie die echte Wand.
let streifen = bild.cropped(to: CGRect(x: s0, y: 0, width: s1 - s0, height: H))
    .transformed(by: CGAffineTransform(translationX: -s0, y: 0))
let schmal = CIFilter.lanczosScaleTransform()
schmal.inputImage = streifen
schmal.scale = 1
schmal.aspectRatio = Float(1.0 / (s1 - s0))
let spalte = schmal.outputImage!.cropped(to: CGRect(x: 0, y: 0, width: 1, height: H))
let flaeche = spalte.clampedToExtent()
    .transformed(by: CGAffineTransform(scaleX: W, y: 1))
    .cropped(to: bild.extent)
// leicht senkrecht glaetten, damit Rauschen aus dem Streifen keine Linien zieht
let glatt = flaeche.clampedToExtent().applyingGaussianBlur(sigma: 6).cropped(to: bild.extent)

// 3. Zusammensetzen
let mix = CIFilter.blendWithMask()
mix.inputImage = bild
mix.backgroundImage = glatt
mix.maskImage = maske
let ergebnis = mix.outputImage!.cropped(to: bild.extent)

let ctx = CIContext()
let farbraum = CGColorSpace(name: CGColorSpace.sRGB)!
try ctx.writePNGRepresentation(of: ergebnis, to: ziel, format: .RGBA8, colorSpace: farbraum)
// Maske zur Kontrolle mit ablegen
try ctx.writePNGRepresentation(of: maske, to: ziel.deletingPathExtension().appendingPathExtension("maske.png"), format: .L8, colorSpace: CGColorSpace(name: CGColorSpace.linearGray)!)
print("Fertig:", ziel.path)
