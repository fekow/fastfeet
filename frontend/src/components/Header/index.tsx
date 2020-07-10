import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/modules/rootReducer';
import { Container } from './styles';
import logo from 'assets/fastfeet-logo@2x.png';
import { signOut } from 'store/modules/auth/actions';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  const { profile } = useSelector((state: RootState) => state.user);
  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="FastFeet" />
        </Link>
        <NavLink activeStyle={active} to="/orders">
          ENCOMENDAS
        </NavLink>
        <NavLink activeStyle={active} to="/couriers">
          ENTREGADORES
        </NavLink>
        <NavLink activeStyle={active} to="/recipients">
          DESTINATÁRIOS
        </NavLink>
        <NavLink activeStyle={active} to="/problems">
          PROBLEMAS
        </NavLink>
      </nav>
      <aside>
        <strong>{profile.name}</strong>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
};
const active = {
  color: '#444444',
};
export default Header;
