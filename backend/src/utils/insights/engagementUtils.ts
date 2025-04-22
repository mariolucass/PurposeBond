const weights = {
  like: 1,
  comment: 3,
  repost: 5,
  follow: 4,
  badge: 6,
  community_join: 3,
  community_post: 4,
  activity_event: 1.5,
};

export function calculateLikeScore(likes: number): number {
  return likes * weights.like;
}

export function calculateCommentScore(comments: number): number {
  return comments * weights.comment;
}

export function calculateRepostScore(reposts: number): number {
  return reposts * weights.repost;
}

export function calculateEngagementScore(
  likes: number,
  comments: number,
  reposts: number
): number {
  return (
    calculateLikeScore(likes) +
    calculateCommentScore(comments) +
    calculateRepostScore(reposts)
  );
}

export function calculateFollowScore(followCount: number): number {
  return followCount * weights.follow;
}

export function calculateBadgeScore(badgeCount: number): number {
  return badgeCount * weights.badge;
}

export function calculateCommunityJoinScore(communityJoins: number): number {
  return communityJoins * weights.community_join;
}

export function calculateCommunityPostScore(
  postsInCommunities: number
): number {
  return postsInCommunities * weights.community_post;
}

export function calculateUserActivityScore(events: number): number {
  return events * weights.activity_event;
}
