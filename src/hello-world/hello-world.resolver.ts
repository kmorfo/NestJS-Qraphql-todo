import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, { description: 'Hola Mundo es lo que retorna', name: 'saludo' })
    helloWorld(): string {
        return 'Hola Mundo';
    }

    @Query(() => Float, { name: 'randomNumber' })
    getRandomNumber() {
        return Math.random() * 100;
    }

    @Query(() => Int, { name: 'randomFromZeroTo', description: 'From 0 to argument TO (default 6)' })
    getRandomFromZeroTo(@Args('to', { nullable: true, type: () => Int }) to: number = 6
    ): number {
        return Math.floor(Math.random() * to);
    }


}
