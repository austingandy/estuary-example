import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation hello-world.flow.yaml#/collections/greetings/derivation.
export class Greetings implements interfaces.Greetings {
    sayHelloPublish(
        source: collections.People,
        register: registers.Greetings,
        previous: registers.Greetings,
    ): collections.Greetings[] {
        return [{id: source.id, greeting:`Hello ${source.name}!`}];
    }
}
