import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCard } from "./pokemon-card";
import { provideRouter, RouterLink } from "@angular/router";
import { SimplePokemon } from "../../interface";
import { By } from "@angular/platform-browser";

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasur'
}

describe('PokemonCardComponent', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;
    //valores imputs
    fixture.componentRef.setInput('pokemon', {...mockPokemon});
    fixture.detectChanges();
  });

  it('shoud create', () => {
    //console.log(fixture.nativeElement.innerHTML);
    expect(component).toBeTruthy()
  })

  it('shoud have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon)
  })

  it('shoudcompute the correct pokemon image url', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${component.pokemon().id}.png`;
    expect(component.pokemonImage()).toBe(expectedUrl)
  })

  it('shoud render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);
    expect(imgElement?.alt).toBe(mockPokemon.name);
  })

  it('shoud have the correct routeLink configuration', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(RouterLink)
    );
    const routerLinkInstance = debugElement.injector.get(RouterLink);
    const expectedUrl = `/pokemons/${mockPokemon.name}`;
    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
  })




});


