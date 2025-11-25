# socialgata-plugin-typings

[![npm (scoped)](https://img.shields.io/npm/v/@infogata/socialgata-plugin-typings)](https://www.npmjs.com/package/@infogata/socialgata-plugin-typings)

Types for [socialgata](https://github.com/InfoGata/socialgata) plugins.

## Installation

```sh
npm i --save-dev @infogata/socialgata-plugin-typings
```

## Usage

Configure _tsconfig.json_

```js
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@infogata"
    ]
  }
}
```

or

Import in script

```js
import "@infogata/socialgata-plugin-typings";
```

## Plugin Methods

SocialGata plugins can implement the following callback methods:

### Feed Methods
- `onGetFeed(request?: GetFeedRequest)` - Get the main feed/timeline
- `onGetCommunity(request: GetCommunityRequest)` - Get posts from a specific community
- `onGetCommunities(request: GetCommunitiesRequest)` - Get list of communities
- `onSearch(request: SearchRequest)` - Search for posts

### Comment Methods
- `onGetComments(request: GetCommentsRequest)` - Get comments for a post
- `onGetCommentReplies(request: GetCommentRepliesRequest)` - Get replies to a comment

### User Methods
- `onGetUser(request: GetUserRequest)` - Get a user's profile and posts

### Instance Methods (Federated Platforms)
- `onGetInstances(request?: GetInstancesRequest)` - Get available instances

### Trending Methods
- `onGetTrendingTopics(request?: GetTrendingTopicsRequest)` - Get trending topics/hashtags
- `onGetTrendingTopicFeed(request: GetTrendingTopicFeedRequest)` - Get posts for a trending topic

### Authentication Methods
- `onLogin(request: LoginRequest)` - Handle login
- `onLogout()` - Handle logout
- `onIsLoggedIn()` - Check login status
- `onPostLogin()` - Called after successful login
- `onPostLogout()` - Called after logout

### UI Methods
- `onUiMessage(message: any)` - Receive messages from UI frames
- `onChangeTheme(theme: Theme)` - Called when theme changes
- `onGetPlatformType()` - Return the platform type (forum, microblog, imageboard)
