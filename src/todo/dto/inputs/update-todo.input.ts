import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field(() => Number)
    @IsInt()
    @Min(1)
    id: number

    @Field(() => String, { description: 'What needs to be done', nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    description?: string;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    done?: boolean;
}