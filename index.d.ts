declare global {
  const application: Application;

  interface Application {
    /**
     * Make a networkRequest from parent SocialGata frame rather from plugin frame.
     */
    networkRequest: typeof fetch;
    /**
     * Used to determine whether requests from networkRequest are restricted by CORs.
     */
    isNetworkRequestCorsDisabled(): Promise<boolean>;
    /**
     * Returns true if the user has been logged in based on what is in
     * authentication in the manifest
     */
    isLoggedIn(): Promise<boolean>;
    /**
     * Returns the user's current theme
     */
    getTheme(): Promise<Theme>;
    /**
     * Sends a message to ui frames like `options` in `manifest.json`.
     */
    postUiMessage(msg: any): Promise<void>;
    /**
     * Get cors proxy configured in settings.
     */
    getCorsProxy(): Promise<string | undefined>;
    /**
     * Show user a notification on the bottom left of the screen
     */
    createNotification(notification: NotificationMessage): Promise<void>;
    /**
     * Callback method to get available instances for federated platforms
     */
    onGetInstances?(request?: GetInstancesRequest): Promise<GetInstancesResponse>;
    /**
     * Callback method to retrieve feeds and lists of posts
     */
    onGetFeed?(request?: GetFeedRequest): Promise<GetFeedResponse>;
    /**
     * Callback method to get a single community's posts
     */
    onGetCommunity?(request: GetCommunityRequest): Promise<GetCommunityResponse>;
    /**
     * Callback method to get list of communities
     */
    onGetCommunities?(
      request: GetCommunitiesRequest
    ): Promise<GetCommunitiesResponse>;
    /**
     * Callback method to get comments for a post
     */
    onGetComments?(request: GetCommentsRequest): Promise<GetCommentsResponse>;
    /**
     * Callback method to get replies to a specific comment
     */
    onGetCommentReplies?(
      request: GetCommentRepliesRequest
    ): Promise<GetCommentRepliesResponse>;
    /**
     * Callback method to get a user's profile and posts
     */
    onGetUser?(request: GetUserRequest): Promise<GetUserResponse>;
    /**
     * Callback method to search for posts
     */
    onSearch?(request: SearchRequest): Promise<SearchResponse>;
    /**
     * Callback method to get trending topics/hashtags
     */
    onGetTrendingTopics?(
      request?: GetTrendingTopicsRequest
    ): Promise<GetTrendingTopicsResponse>;
    /**
     * Callback method to get posts for a trending topic
     */
    onGetTrendingTopicFeed?(
      request: GetTrendingTopicFeedRequest
    ): Promise<GetTrendingTopicFeedResponse>;
    /**
     * Callback method to handle login.
     * When popupName is provided, the host has opened a blank popup with that
     * name. Return { url } to have the host navigate the popup.
     */
    onLogin?(request: LoginRequest): Promise<LoginResponse | void>;
    /**
     * Callback method to handle the OAuth callback URL relayed by the host.
     * Called after the popup redirects back with the full callback URL.
     */
    onLoginCallback?(request: LoginCallbackRequest): Promise<void>;
    /**
     * Callback method to handle logout
     */
    onLogout?(): Promise<void>;
    /**
     * Callback method to check if currently logged in
     */
    onIsLoggedIn?(): Promise<boolean>;
    /**
     * Callback method that receives parent.postMessage requests from UI frames.
     */
    onUiMessage?(message: any): Promise<void>;
    /**
     * Callback method that is called after the user has logged in
     */
    onPostLogin?(): Promise<void>;
    /**
     * Callback method that is called after the user has logged out
     */
    onPostLogout?(): Promise<void>;
    /**
     * Callback method that is called after a user changes theme
     */
    onChangeTheme?(theme: Theme): Promise<void>;
    /**
     * Callback method to get the platform type (forum, microblog, imageboard)
     */
    onGetPlatformType?(): Promise<PlatformType>;
    /**
     * Callback method to upload sync data to cloud storage
     */
    onSyncUpload?(request: SyncUploadRequest): Promise<SyncUploadResponse>;
    /**
     * Callback method to download sync data from cloud storage
     */
    onSyncDownload?(request: SyncDownloadRequest): Promise<SyncDownloadResponse>;
  }

  /**
   * Platform type for UI rendering decisions
   */
  type PlatformType = "forum" | "microblog" | "imageboard";

  /**
   * Theme setting
   */
  type Theme = "light" | "dark" | "system";

  /**
   * A post or comment in the social feed
   */
  interface Post {
    /**
     * Post number (for imageboards)
     */
    number?: number;
    /**
     * Id from third party service this Post was retrieved from.
     */
    apiId?: string;
    /**
     * Title of post
     */
    title?: string;
    /**
     * Body/content of post
     */
    body?: string;
    /**
     * Date the post was published
     */
    publishedDate?: string;
    /**
     * API Id of the community this post belongs to
     */
    communityApiId?: string;
    /**
     * Name of the community this post belongs to
     */
    communityName?: string;
    /**
     * API Id of the post author
     */
    authorApiId?: string;
    /**
     * Display name of the post author
     */
    authorName?: string;
    /**
     * Avatar URL of the post author
     */
    authorAvatar?: string;
    /**
     * Plugin Id of plugin where Post was retrieved from. Set by SocialGata.
     */
    pluginId?: string;
    /**
     * Instance Id for federated platforms
     */
    instanceId?: string;
    /**
     * Original URL of the post
     */
    originalUrl?: string;
    /**
     * URL of the post
     */
    url?: string;
    /**
     * Thumbnail image URL
     */
    thumbnailUrl?: string;
    /**
     * Parent post/comment Id for replies
     */
    parentId?: string;
    /**
     * Nested comments/replies
     */
    comments?: Post[];
    /**
     * Score/upvotes of the post
     */
    score?: number;
    /**
     * Number of comments on the post
     */
    numOfComments?: number;
    /**
     * Id for loading more replies
     */
    moreRepliesId?: string;
    /**
     * Count of additional replies that can be loaded
     */
    moreRepliesCount?: number;
    /**
     * Whether the post contains video content
     */
    isVideo?: boolean;
    /**
     * Playable sources for the video, best-quality/most-complete first.
     * SocialGata tries them in order and falls back to the next one on failure.
     */
    videoSources?: VideoSource[];
    /**
     * The tweet/post this post quotes, embedded inline (quote tweets)
     */
    quotedPost?: Post;
    /**
     * Category/flair label attached to the post (e.g. Reddit link flair)
     */
    flair?: string;
    /**
     * Ratio of upvotes to total votes, between 0 and 1
     */
    upvoteRatio?: number;
    /**
     * Whether the post is marked as not-safe-for-work / adult content
     */
    nsfw?: boolean;
    /**
     * Whether the post is marked as a spoiler
     */
    spoiler?: boolean;
    /**
     * Whether the post is locked (no new comments allowed)
     */
    locked?: boolean;
    /**
     * Whether the post/comment is pinned/stickied to the top
     */
    stickied?: boolean;
    /**
     * Whether the post/comment has been edited after publishing
     */
    edited?: boolean;
    /**
     * Distinguished status of the author (e.g. "moderator", "admin")
     */
    distinguished?: string;
    /**
     * Whether the comment author is the original poster of the thread
     */
    isSubmitter?: boolean;
  }

  /**
   * A single playable source for a video Post
   */
  interface VideoSource {
    /**
     * Url of the video
     */
    source: string;
    /**
     * Type of video. For example `video/mp4` or `application/x-mpegURL`
     */
    type?: string;
  }

  /**
   * A user profile
   */
  interface User {
    /**
     * Id from third party service this User was retrieved from.
     */
    apiId: string;
    /**
     * Display name of the user
     */
    name: string;
    /**
     * Avatar URL of the user
     */
    avatar?: string;
    /**
     * Instance Id for federated platforms
     */
    instanceId?: string;
    /**
     * Handle/username without the leading @ (e.g. "damn_jehu")
     */
    handle?: string;
    /**
     * Profile description/bio
     */
    bio?: string;
    /**
     * Banner/header image URL
     */
    banner?: string;
    /**
     * Location text from the profile
     */
    location?: string;
    /**
     * Website URL from the profile
     */
    website?: string;
    /**
     * When the user joined (e.g. "May 2023")
     */
    joinedDate?: string;
    /**
     * Whether the account is verified
     */
    verified?: boolean;
    /**
     * Number of followers
     */
    followerCount?: number;
    /**
     * Number of accounts this user follows
     */
    followingCount?: number;
    /**
     * Number of posts/tweets
     */
    tweetCount?: number;
    /**
     * Number of posts this user has liked
     */
    likeCount?: number;
  }

  /**
   * A community/subreddit/group
   */
  interface Community {
    /**
     * Id from third party service this Community was retrieved from.
     */
    apiId: string;
    /**
     * Name of the community
     */
    name: string;
    /**
     * Instance Id for federated platforms
     */
    instanceId?: string;
    /**
     * Description of the community
     */
    description?: string;
    /**
     * URL to the original community page on the source platform
     */
    originalUrl?: string;
  }

  /**
   * An instance of a federated platform
   */
  interface Instance {
    /**
     * Display name of the instance
     */
    name: string;
    /**
     * Description of the instance
     */
    description: string;
    /**
     * URL of the instance
     */
    url: string;
    /**
     * API Id of the instance
     */
    apiId: string;
    /**
     * Icon URL of the instance
     */
    iconUrl?: string;
    /**
     * Banner image URL
     */
    bannerUrl?: string;
    /**
     * Banner SVG content
     */
    bannerSvg?: string;
    /**
     * Number of users on this instance
     */
    usersCount?: number;
    /**
     * Number of posts on this instance
     */
    postsCount?: number;
    /**
     * Number of comments on this instance
     */
    commentsCount?: number;
  }

  interface NotificationMessage {
    /**
     * Message to show
     */
    message: string;
    type?: "default" | "success" | "error" | "warning" | "info";
  }

  /**
   * Request to upload document data to cloud storage
   */
  export interface SyncUploadRequest {
    docUrl: string;
    data: string; // Base64-encoded Uint8Array
  }

  /**
   * Response from upload operation
   */
  export interface SyncUploadResponse {
    success: boolean;
    error?: string;
  }

  /**
   * Request to download document data from cloud storage
   */
  export interface SyncDownloadRequest {
    docUrl: string;
  }

  /**
   * Response from download operation
   */
  export interface SyncDownloadResponse {
    data: string | null; // Base64-encoded Uint8Array, or null if not found
    error?: string;
  }

  /**
   * Pagination information
   */
  interface PageInfo {
    /**
     * Total number of results
     */
    totalResults?: number;
    /**
     * Number of results per page
     */
    resultsPerPage?: number;
    /**
     * Current offset
     */
    offset?: number;
    /**
     * Current page identifier
     */
    page?: string | number;
    /**
     * Next page identifier
     */
    nextPage?: string | number;
    /**
     * Previous page identifier
     */
    prevPage?: string | number;
  }

  /**
   * Feed type for different sorting/filtering options
   */
  interface FeedType {
    /**
     * Display name of the feed type
     */
    displayName: string;
    /**
     * Id of the feed type
     */
    id: string;
  }

  /**
   * A trending topic or hashtag
   */
  interface TrendingTopic {
    /**
     * Name of the trending topic
     */
    name: string;
    /**
     * URL for the trending topic
     */
    url?: string;
    /**
     * Usage history of the topic
     */
    history?: Array<{
      day: string;
      uses: string;
      accounts: string;
    }>;
  }

  // Request/Response interfaces

  interface GetInstancesRequest {
    pageInfo?: PageInfo;
  }

  interface GetInstancesResponse {
    instances: Instance[];
    pageInfo?: PageInfo;
  }

  interface GetFeedRequest {
    pageInfo?: PageInfo;
    instanceId?: string;
    feedTypeId?: string;
  }

  interface GetFeedResponse {
    pageInfo?: PageInfo;
    items: Post[];
    feedTypes?: FeedType[];
    feedTypeId?: string;
    instance?: Instance;
  }

  interface GetCommunityRequest {
    apiId: string;
    instanceId?: string;
    pageInfo?: PageInfo;
  }

  interface GetCommunityResponse {
    pageInfo?: PageInfo;
    community?: Community;
    items: Post[];
  }

  interface GetCommunitiesRequest {
    instanceId?: string;
    pageInfo?: PageInfo;
  }

  interface GetCommunitiesResponse {
    items: Community[];
    pageInfo?: PageInfo;
  }

  interface GetUserRequest {
    apiId: string;
    instanceId?: string;
  }

  interface GetUserResponse {
    pageInfo?: PageInfo;
    user?: User;
    items: Post[];
  }

  interface GetCommentsRequest {
    communityId?: string;
    apiId?: string;
    instanceId?: string;
  }

  interface GetCommentsResponse {
    items: Post[];
    post?: Post;
    community?: Community;
    pageInfo?: PageInfo;
  }

  interface GetCommentRepliesRequest {
    apiId: string;
    communityApiId?: string;
    postApiId?: string;
    instanceId?: string;
  }

  interface GetCommentRepliesResponse {
    items: Post[];
    post?: Post;
    pageInfo?: PageInfo;
  }

  interface SearchRequest {
    query: string;
    pageInfo?: PageInfo;
    instanceId?: string;
  }

  interface SearchResponse {
    items: Post[];
    pageInfo?: PageInfo;
  }

  interface GetTrendingTopicsRequest {
    instanceId?: string;
    limit?: number;
    offset?: number;
  }

  interface GetTrendingTopicsResponse {
    items: TrendingTopic[];
    pageInfo?: PageInfo;
  }

  interface GetTrendingTopicFeedRequest {
    topicName: string;
    instanceId?: string;
    pageInfo?: PageInfo;
  }

  interface GetTrendingTopicFeedResponse {
    items: Post[];
    pageInfo?: PageInfo;
    topic?: TrendingTopic;
  }

  interface LoginRequest {
    apiKey: string;
    apiSecret: string;
    /**
     * Name of the popup window opened by the host.
     * Use window.open(url, popupName) to navigate it.
     */
    popupName?: string;
  }

  interface LoginResponse {
    /**
     * URL the host should open in the popup for OAuth.
     */
    url?: string;
  }

  interface LoginCallbackRequest {
    /**
     * The full callback URL from the OAuth popup, including query parameters.
     */
    url: string;
  }

  /**
   * Listing type for distinguishing comments from posts
   */
  type ListingType = "comment" | "post";

  // Plugin configuration interfaces

  interface PluginInfo {
    /**
     * Unique Id of Plugin
     */
    id?: string;
    /**
     * Name of plugin
     */
    name: string;
    /**
     * Javascript code of plugin
     */
    script: string;
    /**
     * Version number
     */
    version?: string;
    /**
     * Description of plugin
     */
    description?: string;
    /**
     * Options page html code
     */
    optionsHtml?: string;
    /**
     * Determines whether the origin of the options iframe
     * should be pluginId.socialgata.com or should be null.
     * Setting to true may be useful for running some libraries
     * on options page.
     */
    optionsSameOrigin?: boolean;
    /**
     * URL for the plugin's home page.
     */
    homepage?: string;
    /**
     * Plugin's manifest
     */
    manifest?: Manifest;
  }

  interface Manifest {
    name: string;
    script: string;
    id?: string;
    version?: string;
    description?: string;
    options?: string | ManifestOptions;
    homepage?: string;
    updateUrl?: string;
    authentication?: ManifestAuthentication;
  }

  interface ManifestOptions {
    page: string;
    sameOrigin?: boolean;
  }

  interface ManifestAuthentication {
    loginUrl: string;
    cookiesToFind?: string[];
    loginButton?: string;
    headersToFind?: string[];
    domainHeadersToFind: Record<string, string[]>;
    completionUrl?: string;
  }
}

export {};
