import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; //object destructuring cartCtx.items -> items

  //chceme celkovy pocet, to jest ak su vybrate dve polozky a jedna je 3x, druha 2x, tak celkovy poce bude 3+2=5!!
  //reducer(curNumber, item)...curNumber je suma, ktora pocitame, item je polozka pola+eset jedna startovacia hodnota
  //vysledok bude cekova suma!
  const numberOfCartItems = items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  //toto cele je len aby zablikal kosik
  //normalne sa prida ccs-trieda, ktora sposobi ze zablika, ale iba raz
  //aby sa to stalo vzsy, ked nieco pridame, musim triedu vzdy automaticky odobrate (cez timer)
  //a potom vzdy pridat...to robi tento useEffect...proste blbosticky :D
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
