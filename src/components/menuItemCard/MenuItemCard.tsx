import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { NumberStepper } from '@components/numberStepper/NumberStepper';
import { actionLabels } from '@constants';
import { FoodType, MenuItemCardProps } from '@types';

import {
    CardContainer,
    Content,
    Footer,
    Header,
    MenuImage,
    MenuTypography,
    OutOfStockText,
} from './MenuItemCard.styles';
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
                fetchPriority="high"
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
                            menuItem?.category === FoodType.VEG
                                ? 'secondary'
                                : 'error'
                        }
                    />
                </Header>
                <MenuTypography variant="body1" color="textSecondary">
                    {menuItem?.description}
                </MenuTypography>
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
                                    color="primary"
                                    onClick={onClick}
                                    disabled={isCartDisabled}
                                >
                                    {actionLabels.ADD}
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
                                <Button
                                    onClick={onEdit}
                                    aria-label={actionLabels.EDIT}
                                >
                                    <EditOutlined />
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    color="error"
                                    onClick={onDelete}
                                    aria-label={actionLabels.DELETE}
                                >
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
