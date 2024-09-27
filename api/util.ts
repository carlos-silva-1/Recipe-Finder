import { NextResponse } from 'next/server';

export const fetchWrapper = async (url: string, method: string = 'GET', headers: {accept: string} = {accept: 'application/json'}) => {
  const options = {
    method: method,
    headers: headers
  }

  try {
    const response = await fetch(url, options);

    if(!response.ok)
      throw new Error(`HTTP Error! Status: ${response.status}`);

    const responseData = await response.json();

    return NextResponse.json({ data: responseData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
