import alt from '../alt';

class AltActions {
  setProfile(prof) {
    return prof;
  }

  getProfile() {
    return true;
  }
  
  setTarget(c) {
    return c;
  }
}

module.exports = alt.createActions(AltActions);