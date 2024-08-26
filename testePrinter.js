import { print } from "./services/print.js"

const order = [{
    "phone": "8888888888",
    "date": "24/08/2024",
    "name": "David Alves",
    "num": "99",
    "itens": "Pizza grande calabresa",
    "itensComp": "borda",
    "obs": "Add cheddar",
    "value": "59.90",
    "valueShipping": "9.90",
    "distance": "5.2",
    "compr": "Comprovante",
    "address": "Rua de teste, 123",
    "addressComp": "AP 501",
    "addressRef": "Ao lado da areninha",
    "addressNeigh": "Centro",
    "addressCity": "Fortaleza"
}]

print(order)