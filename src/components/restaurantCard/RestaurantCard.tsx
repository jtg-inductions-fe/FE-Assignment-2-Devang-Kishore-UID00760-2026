import {
    AccessTimeOutlined,
    DeleteOutlined,
    EditOutlined,
    LocationOnOutlined,
    LockOutlined,
    RamenDiningOutlined,
} from '@mui/icons-material';
import { Box, Button, Chip, Link, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ToggleSwitch } from '@components/toggleSwitch';
import { RestaurantCardProps } from '@types';

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
    RestaurantLogo,
    RestaurantTimings,
    StatusBadge,
    VegChip,
} from './RestaurantCard.styled';

export const RestaurantCard = ({
    Restaurant,
    onEdit,
    onDelete,
    canEdit,
    canDelete,
    canOpen,
    formStateTime,
    onToggle,
}: RestaurantCardProps) => (
    <RestaurantCardContainer>
        <Link
            href={`/restaurant/${Restaurant.id}`}
            underline="none"
            color="textPrimary"
        >
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
                    {Restaurant.isOpen ? 'Open' : 'Closed'}
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
                            Restaurant.category === 'veg'
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
                                {Restaurant.address?.street},{' '}
                                {Restaurant.address?.city},{' '}
                                {Restaurant.address?.state},{' '}
                                {Restaurant.address?.pincode}
                            </Typography>
                        </RestaurantAddress>
                        <Stack flexDirection="row" alignItems="center" gap={2}>
                            <AccessTimeOutlined />
                            <Typography variant="body2">{`${formStateTime(Restaurant.openingTime)}-${formStateTime(Restaurant.closingTime)}`}</Typography>
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
        </Link>
        <RestaurantFooter>
            {canOpen && (
                <ToggleSwitch
                    label={Restaurant.isOpen ? 'Open' : 'Closed'}
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
