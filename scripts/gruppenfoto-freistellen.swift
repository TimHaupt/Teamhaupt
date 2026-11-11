// Gruppenfoto freistellen: alle Personen behalten, Hintergrund transparent.
//
// Nutzt die Freistellung von macOS (Vision, dieselbe wie in Fotos.app) – das
// Foto verlaesst den Rechner nicht. Braucht macOS 14 oder neuer.
//
//   swift scripts/gruppenfoto-freistellen.swift original.jpg frei.png
//
// Neben frei.png entsteht frei.maske.png zur Kontrolle (weiss = Person).

import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
let quelle = URL(fileURLWithPath: a[1]), ziel = URL(fileURLWithPath: a[2])

guard let bild = CIImage(contentsOf: quelle, options: [.applyOrientationProperty: true]) else {
  fatalError("Bild nicht lesbar")
}

let handler = VNImageRequestHandler(ciImage: bild)
let anfrage = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([anfrage])
guard let erg = anfrage.results?.first else { fatalError("Kein Vordergrund erkannt") }
print("Erkannte Objekte:", erg.allInstances.count)

// Maske in voller Bildgroesse fuer alle erkannten Objekte
let maskePuffer = try erg.generateScaledMaskForImage(forInstances: erg.allInstances, from: handler)
let maske = CIImage(cvPixelBuffer: maskePuffer)

// Person ueber transparentem Grund
let leer = CIImage(color: .clear).cropped(to: bild.extent)
let frei = bild.applyingFilter("CIBlendWithMask", parameters: [
  kCIInputBackgroundImageKey: leer,
  kCIInputMaskImageKey: maske,
])

let ctx = CIContext()
let farbraum = CGColorSpace(name: CGColorSpace.sRGB)!
try ctx.writePNGRepresentation(of: frei, to: ziel, format: .RGBA8, colorSpace: farbraum)
let maskeZiel = ziel.deletingPathExtension().appendingPathExtension("maske.png")
try ctx.writePNGRepresentation(of: maske, to: maskeZiel, format: .L8, colorSpace: CGColorSpace(name: CGColorSpace.linearGray)!)
print("Fertig:", ziel.path)
