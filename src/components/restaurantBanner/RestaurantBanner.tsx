import { AccessTime, LocationOnOutlined } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, Chip, Stack, Typography } from '@mui/material';

import { TextField } from '@components/textField';
import { actionLabels } from '@constants';
import { restaurantMenuContent } from '@pages/restaurantMenu/restaurantMenu.constants';
import { FoodType } from '@types';

import {
    BackButton,
    BannerContainer,
    BannerContent,
    BannerImage,
    CuisineWrapper,
    EllipsisTypography,
    InfoRow,
    RestaurantActions,
    RestaurantInfo,
    RestaurantLogo,
    TopRow,
} from './RestaurantBanner.styles';
import { RestaurantBannerProps } from './restaurantBanner.types';

export const RestaurantBanner = (props: RestaurantBannerProps) => {
    const {
        restaurant,
        showEdit,
        handleBack,
        isEditingTime,
        setIsEditingTime,
        openingTime,
        closingTime,
        setOpeningTime,
        setClosingTime,
        handleSaveTimings,
    } = props;

    return (
        <BannerContainer>
            <BannerImage
                src={restaurant?.image_link}
                fetchPriority="high"
                isOpen={restaurant?.is_open}
                alt={restaurant?.name}
            />
            <BannerContent>
                <RestaurantLogo
                    src={restaurant?.logo_link}
                    alt={restaurant?.name}
                    fetchPriority="high"
                />
                <BackButton onClick={handleBack} aria-label={actionLabels.BACK}>
                    <KeyboardBackspaceIcon />
                </BackButton>
                <RestaurantInfo>
                    <TopRow>
                        <EllipsisTypography variant="h2">
                            {restaurant?.name}
                        </EllipsisTypography>
                    </TopRow>
                    <EllipsisTypography variant="body1">
                        {restaurant?.description}
                    </EllipsisTypography>
                    <InfoRow>
                        <MailOutlineIcon />
                        <Typography variant="body1">
                            {restaurant?.email}
                        </Typography>
                    </InfoRow>
                    <InfoRow>
                        <CallIcon />
                        <Typography variant="body1">
                            {restaurant?.contact_number}
                        </Typography>
                    </InfoRow>
                    <InfoRow>
                        <LocationOnOutlined />
                        <Typography variant="body2">
                            {`${restaurant?.address?.street}, ${restaurant?.address?.city}, ${restaurant?.address?.state}, ${restaurant?.address?.pincode}`}
                        </Typography>
                    </InfoRow>
                    <CuisineWrapper>
                        {restaurant?.cuisines?.map((cuisine) => (
                            <Chip
                                label={cuisine}
                                variant="filled"
                                key={cuisine}
                            />
                        ))}
                    </CuisineWrapper>
                </RestaurantInfo>
                <RestaurantActions>
                    <Chip
                        label={restaurant?.food_type}
                        color={
                            restaurant?.food_type === FoodType.VEG
                                ? 'secondary'
                                : 'error'
                        }
                    />
                    <Typography variant="h5">
                        {restaurantMenuContent.TIMINGS_LABEL}
                    </Typography>
                    <InfoRow>
                        {isEditingTime ? (
                            <Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        type="time"
                                        value={openingTime}
                                        onChange={(e) =>
                                            setOpeningTime(e.target.value)
                                        }
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.common.white,
                                        }}
                                    />
                                    <TextField
                                        type="time"
                                        value={closingTime}
                                        onChange={(e) =>
                                            setClosingTime(e.target.value)
                                        }
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.common.white,
                                        }}
                                    />
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        onClick={() => setIsEditingTime(false)}
                                        color="error"
                                    >
                                        {actionLabels.CANCEL}
                                    </Button>
                                    <Button onClick={handleSaveTimings}>
                                        {actionLabels.SAVE}
                                    </Button>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={4}>
                                <AccessTime />
                                <Typography variant="h6">
                                    {restaurant?.opening_time}-
                                    {restaurant?.closing_time}
                                </Typography>
                                {showEdit && (
                                    <Button
                                        onClick={() => setIsEditingTime(true)}
                                        variant="outlined"
                                    >
                                        {actionLabels.EDIT}
                                    </Button>
                                )}
                            </Stack>
                        )}
                    </InfoRow>
                </RestaurantActions>
            </BannerContent>
        </BannerContainer>
    );
};
