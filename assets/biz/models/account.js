import {BaseModel, createModel, crud, exec} from 'beatle';
import account from '../resources/account';

@createModel(account, true)
class AccountModal extends BaseModel {
  state = {
    item: crud.item,
    list: crud.list
  }

  @exec('item')
  getProfile = crud.get

  @exec('list')
  fetchRepos = crud.get;
}

export default AccountModal;
