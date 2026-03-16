import { ApplicationRef, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html'
})
export default class PokemonsPage implements OnInit, OnDestroy {

  // public currentName = signal('Thalo');
  public pokemons = signal<SimplePokemon[]>([]);
  private pokemonsService = inject(PokemonsService);
  private title = inject(Title);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  );

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable});
  // });

  ngOnInit(): void {

    //this.route.queryParamMap.subscribe(console.log);
    //console.log(this.currentPage());
    //this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  });

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page: number = 0) {
    //console.log({pageToLoad});
    this.pokemonsService.loadPage(page)
    .pipe(
      //tap(() => this.router.navigate([], {queryParams: {page: pageToLoad}})),
      tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`))
    )
    .subscribe(pokemons => {
      this.pokemons.set(pokemons);
    });
  }

}
