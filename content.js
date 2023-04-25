function hideUsers() {
  const tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach((tweet) => {
    const author = tweet.querySelector('[data-testid="tweet"] [data-testid="tweetAuthor"]');
    if (author) {
      const followerCount = author.querySelector('[data-testid="UserCell"]').lastChild.textContent;
      const verifiedBadge = author.querySelector('[data-testid="verified"]');
      const blueVerifiedBadge = author.querySelector('[data-testid="InlineAccountVerification"]');
      const newVerificationBadge = author.querySelector('[data-testid="PaidVerificationBadge"]');
      const twitterBlueBadge = author.querySelector('[data-testid="SubscriptionBadge"]');
      if ((verifiedBadge && parseInt(followerCount.replace(/,/g, "")) < 10000) ||
          (blueVerifiedBadge && parseInt(followerCount.replace(/,/g, "")) < 10000) ||
          (newVerificationBadge && parseInt(followerCount.replace(/,/g, "")) < 100000) ||
          (twitterBlueBadge && parseInt(followerCount.replace(/,/g, "")) < 10000)) {
        tweet.style.display = "none";
        const authorName = author.querySelector('[data-testid="UserLink"]').title;
        let reason = "";
        if (verifiedBadge) {
          reason = "verified status";
        } else if (blueVerifiedBadge) {
          reason = "blue verified status";
        } else if (newVerificationBadge) {
          reason = "paid verification";
        } else if (twitterBlueBadge) {
          reason = "Twitter Blue subscription";
        }
        console.log(`Hidden tweet from ${authorName} due to ${reason} and ${followerCount} followers.`);
      }
    }
  });
}

function handlePage() {
  const pagePath = window.location.pathname;
  if (pagePath.startsWith("/home") || pagePath.startsWith("/explore") || pagePath.startsWith("/i/")) {
    hideUsers();
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          hideUsers();
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

window.onload = function() {
  handlePage();
};

window.onpopstate = function() {
  handlePage();
};
