import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-about',
  imports: [],
  templateUrl: './pricing-page.html'
})
export default class PricingPage implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing Page';
    // }
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({name: 'description', content: 'Este es mi Pricing page' });
    this.meta.updateTag({name: 'og:title', content: 'Pricing page' });
    this.meta.updateTag({name: 'keywords', content: 'Hola,Mundo,Thalo,Murgueytio,Curso,Angular,PRO' });
  }

}
