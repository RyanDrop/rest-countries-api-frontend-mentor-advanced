import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { HeaderComponent } from './header.component';

const $getDivDarkMode = () => screen.getByTestId('dark-mode') as HTMLDivElement;
const $html = document.documentElement;

describe('HeaderComponent', () => {
  it('toggle dark-mode', async () => {
    await render(HeaderComponent, {
      imports: [],
    });
    expect($getDivDarkMode()).toBeTruthy();

    userEvent.click($getDivDarkMode());
    expect($html.classList.contains('dark-mode')).toBeTruthy();

    userEvent.click($getDivDarkMode());
    expect($html.classList.contains('dark-mode')).toBeFalsy();
  });
});
