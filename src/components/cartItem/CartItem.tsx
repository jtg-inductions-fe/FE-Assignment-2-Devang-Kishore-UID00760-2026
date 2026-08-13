import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';

import { NumberStepper } from '@components/numberStepper/NumberStepper';
import { CartItemProps } from '@types';

import {
    CartActions,
    CartItemContainer,
    CartItemDetails,
    CartItemImage,
    CartItemName,
    QuantityContainer,
} from './CartItem.styles';
export const CartItem = (props: CartItemProps) => {
    const { item, onChange, onDecrease, onRemove } = props;
    const { item: menuItem, quantity } = item;
    return (
        <CartItemContainer>
            <CartItemImage src={menuItem.image} alt={menuItem.name} />
            <CartItemDetails>
                <CartItemName variant="h5">{menuItem.name}</CartItemName>
                <Typography variant="h6">&#8377;{menuItem.price}</Typography>
            </CartItemDetails>
            <CartActions>
                <QuantityContainer>
                    <NumberStepper
                        value={quantity}
                        onChange={(value: number) =>
                            onChange(menuItem.id, value)
                        }
                        onDecrement={() => onDecrease(menuItem.id)}
                    />
                </QuantityContainer>
                <IconButton color="error" onClick={() => onRemove(menuItem.id)}>
                    <DeleteIcon />
                </IconButton>
            </CartActions>
        </CartItemContainer>
    );
};
