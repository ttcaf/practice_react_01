import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
	return (
		<header className="bg-gray-800 py-4">
			<div className="max-w-screen-2xl mx-auto px-2">
				<h1 className="text-white text-2xl font-bold">Cute Dog Images</h1>
			</div>
		</header>
	);
}

// srcはstring型と定義。
function Image({ src }: {src: string}) {
	return (
		<figure>
			<img
				src={src}
				alt="cute dog"
				className="w-full h-full object-cover object-center"
			/>
		</figure>
	);
}

function Loading() {
	return (
		<p>Loading...</p>
	);
}

// urlsはstring型の配列と定義。
function Gallery({ urls }: { urls: string[]}) {
	if(urls == null) {
		return <Loading />;
	}

	return (
		<div className="grid grid-cols-4 gap-3">
			{/* 新たな配列を生成して、それを戻り値として返す。urls側で型定義をしているので、urlに対しての型定義は不要。 */}
			{urls.map((url) => {
				return (
					// キーを指定してReact側が判別しやすくする。
					<div key={url} className="w-full h-full flex items-center justify-center">
						<Image src={url} />
					</div>
				);
			})}
		</div>
	);
}

// 親コンポーネント（Main）からのデータ（breed）の受け取り。
//  voidは戻り値がないことを示す。
function Form({ onFormSubmit }: { onFormSubmit: (breed: string) => void}) {
	function handleSubmit(event) {
		event.preventDefault();
		const { breed } = event.target.elements;
		onFormSubmit(breed.value);
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="flex items-center gap-2">
					<div className="flex-1">
						<select name="breed" defaultValue="shiba" className="border border-gray-300 rounded-md p-2 w-full">
							<option value="shiba">Shiba</option>
							<option value="akita">Akita</option>
						</select>
					</div>
					<div className="w-24">
						<button type="submit" className="w-full bg-blue-500 text-white rounded-md p-2">Reload</button>
					</div>
				</div>
			</form>
		</div>
	)
}

function Main() {
	// urlsは画像URLの配列（現在の状態値）、setUrlsはurls（状態）を更新する関数。
	// 初期値はnull。型は文字列の配列、またはnullと定義。
	const [urls, setUrls] = useState<string[] | null>(null);

	// 第一引数でfetchImagesを呼び出し、shibaを渡す（breedに渡す）。
	// 第二引数を空にすると、最初にコンポーネントがレンダリングされた時のみ実行される。
	useEffect(() => {
		fetchImages("shiba").then((urls) => {
			// データをurlsに格納。
			setUrls(urls);
		});
	}, []);

	// フォームからのデータの受け取り。
	function reloadImages(breed: string) {
		fetchImages(breed).then((urls) => {
			setUrls(urls);
		})
	}

	return (
		<main>
			<div className="py-10">
				<div className="max-w-screen-sm mx-auto px-2">
					<Form onFormSubmit={reloadImages} />
				</div>
			</div>
			<section className="py-10">
				<div className="max-w-screen-2xl mx-auto px-2">
					<Gallery urls={urls}/>
				</div>
			</section>
		</main>
	)
}

function Footer() {
	return (
		<footer className="bg-gray-100 py-12">
			<div className="max-w-screen-2xl mx-auto px-2">
				<div className="text-center">
					<p>Dog images are retrieved from Dog API</p>
					<p className="mt-2">
						<a href="https://dog.ceo/dog-api/about" className="text-blue-500 underline hover:no-underline" target="_blank" rel="noreferrer">Donate to Dog API</a>
					</p>
				</div>
			</div>
    </footer>
	)
}

function App() {
  return (
    <div>
			<Header />
			<Main />
      <Footer />
    </div>
  );
}

export default App;