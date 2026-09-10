import {
    AccessTimeOutlined,
    DeleteOutlined,
    EditOutlined,
    LocationOnOutlined,
    LockOutlined,
    RamenDiningOutlined,
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ToggleSwitch } from '@components/toggleSwitch';
import { RESTAURANT_STATE } from '@constants';
import { FoodType } from '@types';
import { formateTime } from '@utils/formateTime';

import {
    ClosedIcon,
    EllipsisTypography,
    RestaurantAddress,
    RestaurantCardContainer,
    RestaurantContent,
    RestaurantData,
    RestaurantFooter,
    RestaurantHeader,
    RestaurantImage,
    RestaurantImageContainer,
    RestaurantInfo,
    RestaurantLink,
    RestaurantLogo,
    RestaurantTimings,
    StatusBadge,
    VegChip,
} from './RestaurantCard.styles';
import { RestaurantCardProps } from './restaurantCard.types';

export const RestaurantCard = ({
    Restaurant,
    onEdit,
    onDelete,
    canEdit,
    canDelete,
    canOpen,
    onToggle,
}: RestaurantCardProps) => (
    <RestaurantCardContainer>
        <RestaurantLink to={`/restaurant/${Restaurant.id}`} color="textPrimary">
            <RestaurantImageContainer>
                <RestaurantImage
                    src={Restaurant.image}
                    alt={Restaurant.name}
                    open={Restaurant.isOpen}
                />
                <RestaurantLogo src={Restaurant.logo} alt={Restaurant.name} />
                {!Restaurant.isOpen && (
                    <ClosedIcon>
                        <LockOutlined fontSize="inherit" />
                    </ClosedIcon>
                )}

                <StatusBadge open={Restaurant.isOpen}>
                    {Restaurant.isOpen
                        ? RESTAURANT_STATE.OPEN
                        : RESTAURANT_STATE.CLOSE}
                </StatusBadge>
            </RestaurantImageContainer>
            <RestaurantContent>
                <RestaurantHeader>
                    <Grid size={10}>
                        <EllipsisTypography variant="h4">
                            {Restaurant.name}
                        </EllipsisTypography>
                        <EllipsisTypography variant="body2">
                            {Restaurant.description}
                        </EllipsisTypography>
                    </Grid>
                    <VegChip
                        label={Restaurant.category}
                        color={
                            Restaurant.category === FoodType.VEG
                                ? 'secondary'
                                : 'error'
                        }
                    />
                </RestaurantHeader>
                <RestaurantInfo>
                    <RestaurantTimings>
                        <RestaurantAddress>
                            <LocationOnOutlined />
                            <Typography variant="body2" color="textSecondary">
                                {`${Restaurant.address?.street}, ${Restaurant.address?.city}, ${Restaurant.address?.state}, ${Restaurant.address?.pincode}`}
                            </Typography>
                        </RestaurantAddress>
                        <Stack flexDirection="row" alignItems="center" gap={2}>
                            <AccessTimeOutlined />
                            <Typography variant="body2">{`${formateTime(Restaurant.openingTime)}-${formateTime(Restaurant.closingTime)}`}</Typography>
                        </Stack>
                    </RestaurantTimings>
                    <RestaurantData>
                        <RamenDiningOutlined />
                        {Restaurant.cuisines
                            .slice(0, 3)
                            ?.map((cuisine) => (
                                <Chip
                                    label={cuisine}
                                    variant="outlined"
                                    key={cuisine}
                                />
                            ))}
                        {Restaurant.cuisines.length > 3 && (
                            <Chip
                                label={`+${Restaurant.cuisines.length - 3}`}
                                variant="outlined"
                            />
                        )}
                    </RestaurantData>
                </RestaurantInfo>
            </RestaurantContent>
        </RestaurantLink>
        <RestaurantFooter>
            {canOpen && (
                <ToggleSwitch
                    label={
                        Restaurant.isOpen
                            ? RESTAURANT_STATE.OPEN
                            : RESTAURANT_STATE.CLOSE
                    }
                    color="secondary"
                    checked={Restaurant.isOpen}
                    onChange={onToggle}
                />
            )}
            <Box>
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
            </Box>
        </RestaurantFooter>
    </RestaurantCardContainer>
);
