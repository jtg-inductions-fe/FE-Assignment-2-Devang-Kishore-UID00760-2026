import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { NumberStepper } from '@components/numberStepper/NumberStepper';
import { MenuItemCardProps } from '@types';

import {
    CardContainer,
    Content,
    Footer,
    Header,
    MenuImage,
    MenuTypography,
    OutOfStockText,
} from './MenuItemCard.styled';
export const MenuItemCard = (props: MenuItemCardProps) => {
    const {
        menuItem,
        presentInCart,
        stock,
        canEdit,
        canChangeStock,
        canDelete,
        canAddInCart,
        isCartDisabled,
        quantity,
        onChange,
        onDecrease,
        onClick,
        onEdit,
        onDelete,
        changeStock,
        onBlur,
        onDecrement,
    } = props;
    return (
        <CardContainer>
            <MenuImage
                src={menuItem?.image}
                alt={menuItem?.name}
                inStock={menuItem.stock > 0}
            />
            {menuItem.stock == 0 && (
                <OutOfStockText label="Out Of Stock" color="error" />
            )}
            <Content>
                <Header>
                    <Grid size={8}>
                        <MenuTypography variant="h4">
                            {menuItem?.name}
                        </MenuTypography>
                    </Grid>
                    <Chip
                        label={menuItem?.category}
                        color={
                            menuItem?.category === 'veg' ? 'secondary' : 'error'
                        }
                    />
                </Header>
                <MenuTypography variant="body1" color="textSecondary">
                    {menuItem?.description}
                </MenuTypography>
                <Typography variant="body2" color="warning.main">
                    {menuItem?.cuisine}
                </Typography>
                <Footer>
                    <Typography variant="h5">
                        &#8377; {menuItem?.price}
                    </Typography>
                    <Box padding={1}>
                        {canAddInCart &&
                            (presentInCart && quantity > 0 ? (
                                <NumberStepper
                                    value={quantity}
                                    onChange={(value: number) =>
                                        onChange(menuItem.id, value)
                                    }
                                    onDecrement={() => onDecrease(menuItem.id)}
                                />
                            ) : (
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={onClick}
                                    disabled={isCartDisabled}
                                >
                                    Add
                                    <AddShoppingCartIcon />
                                </Button>
                            ))}

                        {canChangeStock && (
                            <NumberStepper
                                value={stock}
                                onChange={changeStock}
                                onBlur={(value: number) => onBlur(value)}
                                onDecrement={onDecrement}
                            />
                        )}
                        <Stack flexDirection="row" justifyContent="flex-end">
                            {canEdit && (
                                <Button onClick={onEdit}>
                                    <EditOutlined />
                                </Button>
                            )}
                            {canDelete && (
                                <Button color="error" onClick={onDelete}>
                                    <DeleteOutlined />
                                </Button>
                            )}
                        </Stack>
                    </Box>
                </Footer>
            </Content>
        </CardContainer>
    );
};
