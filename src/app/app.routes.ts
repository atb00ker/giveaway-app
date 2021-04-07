// App routes is put seperately to ensure that the paths can be
// used in the components and app-routing.module without causing circular
// dependency

export class AppRoutes {
  public static home = 'home';
  public static about = 'about';
  public static createEvent = 'create-event';
  public static event = 'giveaway';
  public static pickEventWinner = 'pick-winner';
}
