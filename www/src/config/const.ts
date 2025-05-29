export const DEFAULT_MESSAGES = {
    ERRORS: {
        GENERIC: "An error occurred, please try again later",
        USER_FETCHING: "Please wait while we fetch your user data",
        NOT_FOUND: "The requested resource was not found",
        PRODUCTS_FETCH_FAILED:
            "An error occurred while trying to fetch the products. Please try again later",
    },
} as const;

export const DEFAULT_PAGINATION_LIMIT = 20;
export const DEFAULT_PAGINATION_PAGE = 1;
