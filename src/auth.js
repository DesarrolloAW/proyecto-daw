class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(cb) {
      this.authenticated = true;
      localStorage.setItem('myData', true);
      cb();
    }
  
    logout(/*cb*/) {
      this.authenticated = false;
      localStorage.removeItem('myData');
      localStorage.removeItem('typeUser');
      //cb();
    }
  
    isAuthenticated() {
      if(localStorage.getItem('myData') === 'true')
        return true;
      return false;
      //return this.authenticated;
    }
  }
  
  export default new Auth();