import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonList } from "./pokemon-list";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interface";

const mockPokemons: SimplePokemon[] = [
  {id: '1', name: 'bulbasur'},
  {id: '2', name: 'ivysaur'},
]

describe('PokemonListComponent', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;
    //valores imputs
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
  });

  it('shoud create', () => {
    //console.log(fixture.nativeElement.innerHTML);
    expect(component).toBeTruthy()
  })

  it('shoud render the pokemon list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pokemonsCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonsCards.length).toBe(mockPokemons.length);
  })
  it('shoud render "No hay pokemons" when list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('div.col-span-5');
    //console.log(message?.textContent);
    expect(message?.textContent.trim()).toBe('No hay pokemons');
  })

});


