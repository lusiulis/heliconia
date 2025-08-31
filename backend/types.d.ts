type DeviceRole = 'ADMIN' | 'KITCHEN' | 'CHECKOUT' | 'WAITER';

type LoggedDevice = {
  id: string;
  role: DeviceRole;
};

declare namespace Express {
  export interface Request {
    loggedDevice: LoggedDevice;
  }
}
