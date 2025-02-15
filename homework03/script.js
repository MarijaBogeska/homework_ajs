// Create a class Animal that has:
// name
// type - carnivore/herbivore/omnivore
// age
// size
// eat - a method that checks if the input is an Animal.
// If the input is an Animal and If this object animal is herbivore write in the console: The animal ( this animal name ) is a herbivore and does not eat other animals
// If the input is an Animal, and If this object animal is not herbivore, then change the input Animal property isEaten to true and log in the console: The animal (this animal name) ate the (the input animal name).
// If the animal is twice as large or larger than this animal than just log in the console: The animal (this animal name) tried to eat the (the input animal name) but it was too large.
// If the input is not an animal just write: The animal (this animal name) is eating (the input).
// isEaten = default false

class Animal {
  constructor(name, type, age, size) {
    this.name = name;
    this.type = type;
    this.age = age;
    this.size = size;
    this.isEaten = false;
  }
  eat(input) {
    if (input instanceof Animal) {
      if (input.type.toLowerCase() === "herbivore") {
        console.log(
          `The animal ${input.name} is a herbivore and does not eat other animals`
        );
      } else {
        this.isEaten = true;
        console.log(`The animal ${input.name} ate the ${this.name}.`);
      }
      if (input.size > this.size) {
        console.log(
          `The animal ${this.name} tried to eat the ${input.name} but it was too large.`
        );
      }
    } else {
      console.log(`The animal ${this.name} is eating the ${input.name}`);
    }
  }
}

let animal = new Animal("Zebra", "herbivore", 10, 100);

let animal2 = new Animal("Blackbuck", "herbivore", 20, 80);
animal.eat(animal2);
console.log(animal2);
console.log(animal);

let newAnimal = {
  name: "animal",
};

let carnivoreAnimal = new Animal("Lion", "carnivore", 10, 110);
animal.eat(carnivoreAnimal);
