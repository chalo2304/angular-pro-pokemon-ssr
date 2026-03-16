import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="test-class">
    <a href="test-link">Test Link</a>
  </nav>`
})
class MockNavbar {}

describe('App', () => {

  let fixture : ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    //! #1
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])]
    // }).compileComponents();
    //! #2
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])]
    // })
    // .overrideComponent(App, {
    //   add: {
    //     imports: [MockNavbar]
    //   },
    //   remove: {
    //     imports: [Navbar]
    //   }
    // })
    // .compileComponents();
    //! #3
    TestBed.overrideComponent(App, {
      set: {
        imports: [MockNavbar],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
    });

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(App);
    // const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render the navbar and router-outlet', () => {
    // const fixture = TestBed.createComponent(App);
    // const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.innerHTML);

    expect(compiled.innerHTML).toMatchSnapshot();

  });

  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
