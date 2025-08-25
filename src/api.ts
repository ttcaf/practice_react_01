// 非同期でデータを取得する。
export async function fetchImages(breed: string) {
	// APIへHTTPリクエストを送信。
	const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
	// レスポンスをJSON形式に変換。
	const data = await response.json();
	// データを返す。
	return data.message;
}