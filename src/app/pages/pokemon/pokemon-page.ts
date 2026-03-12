import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interface';
import { PokemonsService } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
})
export default class PokemonPage implements OnInit {

  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  public pokemon = signal<Pokemon| null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    console.log({id});
    this.pokemonsService.loadPokemon(id).subscribe(this.pokemon.set);
  }


}
