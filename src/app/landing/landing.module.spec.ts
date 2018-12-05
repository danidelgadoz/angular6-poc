import { LandingModule } from './landing.module';

describe('LandingModule', () => {
  let landingModule: LandingModule;

  beforeEach(() => {
    landingModule = new LandingModule();
  });

  xit('should create an instance', () => {
    expect(landingModule).toBeTruthy();
  });
});
