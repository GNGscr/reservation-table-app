import urls from '../../data/aws_urls.json' with { type: 'json' };

export async function fetchJsonData() {
    // Fetch all URLs in parallel
    const results = await Promise.allSettled(
      urls?.map(url => fetch(url).then(res => res.json()))
    );
  
    // Map results to include status and data or error
    return results.map((res, i) => ({
      url: urls[i],
      status: res.status,
      data: res.status === "fulfilled" ? res.value : null,
      error: res.status === "rejected" ? res.reason : null
    }));
  }
  