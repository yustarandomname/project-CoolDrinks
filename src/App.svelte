<svelte:head>
	<script type="module" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js"></script>
	<script nomodule="" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.js"></script>
</svelte:head>

<script>
	import {Columns, Container, Loading, Button} from "projectc-components"

	export let supabase

	$: users = []

	async function getData() {
		let { data, error } = await supabase
			.from('CoolDrinksUsers')
			.select("*")
			.order("name")

		users = data
	}

	getData()

	async function inc(data) {
		let {data: selectData, error: selectError} = await supabase
			.from('CoolDrinksUsers')
			.select("score")
			.eq("name", data.name)
			.single()

		if (selectError) return console.log(selectError)

		let {data: updateData, error} = await supabase
			.from('CoolDrinksUsers')
			.update({ score: ++selectData.score })
			.eq("name", data.name)
			.single()

		if (error) return console.log(error)

		data.score = updateData.score

		users = users.map((user) => {
			if (user.id == data.id) return data
			else return user
		})
	}

	async function dec(data) {
		let {data: selectData, error: selectError} = await supabase
			.from('CoolDrinksUsers')
			.select("score")
			.eq("name", data.name)
			.single()

		if (selectError) return console.log(selectError)

		let {data: updateData, error} = await supabase
			.from('CoolDrinksUsers')
			.update({ score: --selectData.score })
			.eq("name", data.name)
			.single()

		if (error) return console.log(error)

		data.score = updateData.score

		users = users.map((user) => {
			if (user.id == data.id) return data
			else return user
		})
	}
</script>

<style>
	.hstack {
		display: flex;
		width: 100%;
		align-items: center;
	}

	.spacer {
		width:100%
	}
</style>
	{#key users}
	<Columns data={users} header="Project Cool Drinks" customStyle={true} size="m" let:columnItem>
		<Container>
			<h1>{columnItem.name}</h1>

			<div class="hstack">
				<Button icon="remove-outline" on:click={() => dec(columnItem)} />
				<div class="spacer"></div>
				{#key columnItem.score}
					<div>{columnItem.score}</div>
				{/key}
				<div class="spacer"></div>
				<Button icon="add-outline" on:click={() => inc(columnItem)} />
			</div>
		</Container>
	</Columns>
	{/key}