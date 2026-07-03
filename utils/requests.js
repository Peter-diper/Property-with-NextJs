const apiDomain = process.env.NEXT_PUBLIC_DOMAIN_API || null;

async function fetchProperties() {
  try {
    // handle the case where the domain is not available yet
    if (!apiDomain) return [];

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("some thing went wrong");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
export { fetchProperties };
