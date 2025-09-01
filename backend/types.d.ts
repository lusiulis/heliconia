type DeviceRole = 'ADMIN' | 'KITCHEN' | 'CHECKOUT' | 'WAITER';

type LoggedDevice = {
  id: string;
  role: DeviceRole;
  kitchenId: string;
};


declare namespace Express {
  export interface Request {
    loggedDevice: LoggedDevice;
  }
}
