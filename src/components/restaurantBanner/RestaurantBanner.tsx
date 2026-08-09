import { AccessTime, LocationOnOutlined } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, Chip, Stack, Typography } from '@mui/material';

import { EllipsisTypography } from '@components/restaurantCard/RestaurantCard.styled';
import { RestaurantBannerProps } from '@types';

import {
    BackButton,
    BannerContainer,
    BannerContent,
    BannerImage,
    CuisineWrapper,
    InfoRow,
    RestaurantActions,
    RestaurantInfo,
    RestaurantLogo,
    TimeInput,
    TopRow,
} from './RestaurantBanner.styled';

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
            <BannerImage src={restaurant?.image} isOpen={restaurant?.isOpen} />
            <BannerContent>
                <RestaurantLogo src={restaurant?.logo} alt={restaurant?.name} />
                <BackButton onClick={handleBack}>
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
                            {restaurant?.contactNumber}
                        </Typography>
                    </InfoRow>
                    <InfoRow>
                        <LocationOnOutlined />
                        <Typography variant="body2">
                            {restaurant?.address?.street},{' '}
                            {restaurant?.address?.city},{' '}
                            {restaurant?.address?.state},{' '}
                            {restaurant?.address?.pincode}
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
                        label={restaurant?.category}
                        color={
                            restaurant?.category === 'veg'
                                ? 'secondary'
                                : 'error'
                        }
                    />
                    <Typography variant="h5">Restaurant Timings</Typography>
                    <InfoRow>
                        {isEditingTime ? (
                            <Stack>
                                <Stack direction="row" spacing={2}>
                                    <TimeInput
                                        type="time"
                                        value={openingTime}
                                        onChange={(e) =>
                                            setOpeningTime(e.target.value)
                                        }
                                    />
                                    <TimeInput
                                        type="time"
                                        value={closingTime}
                                        onChange={(e) =>
                                            setClosingTime(e.target.value)
                                        }
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
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSaveTimings}>
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={4}>
                                <AccessTime />
                                <Typography variant="h6">
                                    {restaurant?.openingTime}-
                                    {restaurant?.closingTime}
                                </Typography>
                                {showEdit && (
                                    <Button
                                        onClick={() => setIsEditingTime(true)}
                                        variant="outlined"
                                    >
                                        Edit
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
