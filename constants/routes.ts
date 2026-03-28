const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    ASK_QUESTION: "/ask-question",
    QUESTION: (id: string) => `/questions/${id}`,
    SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
    COLLECTION: "/collection",
    COMMUNITY: "/community",
    TAGS: "/tags",
    JOBS: "/jobs",
    POST_JOB: "/jobs/post",
    JOB: (id: string) => `/jobs/${id}`,
}
export default ROUTES;

