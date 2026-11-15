import keyboardImage from '../assets/products/keyboard.jpg'
import mouseImage from '../assets/products/mouse.jpg'
import headphonesImage from '../assets/products/headphones.jpg'
import monitorImage from '../assets/products/monitor.jpg'
import laptopStandImage from '../assets/products/laptop-stand.jpg'
import webcamImage from '../assets/products/webcam.jpg'
import externalDriveImage from '../assets/products/external-drive.jpg'
import speakerImage from '../assets/products/speaker.jpg'

export const products = [
    { id: 'p1', name: 'Teclado Mecánico', price: 450, image: keyboardImage },
    { id: 'p2', name: 'Mouse Gamer', price: 180, image: mouseImage },
    { id: 'p3', name: 'Audífonos', price: 320, image: headphonesImage },
    { id: 'p4', name: 'Monitor 24"', price: 1200, image: monitorImage },
    { id: 'p5', name: 'Soporte para Laptop', price: 160, image: laptopStandImage },
    { id: 'p6', name: 'Cámara Web', price: 280, image: webcamImage },
    { id: 'p7', name: 'Disco Externo 1TB', price: 750, image: externalDriveImage },
    { id: 'p8', name: 'Parlante Bluetooth', price: 390, image: speakerImage },
]

export const productsById = Object.fromEntries(products.map((product) => [product.id, product]))
