export class LoginAction {
  static readonly type = '[User] Login user';
  constructor(public email: string, public password: string) {}
}

export class LogoutAction {
  static readonly type = '[User] Logout user';
  constructor() {}
}

export class RegisterAction {
  static readonly type = '[User] Register user';
  constructor(public email: string, public password: string) {}
}
