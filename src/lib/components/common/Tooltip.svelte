<script lang="ts">
	import { onDestroy } from 'svelte';
	import { marked } from 'marked';

	import tippy from 'tippy.js';
	import 'tippy.js/animations/shift-toward-subtle.css';

	export let placement = 'top';
	export let content = `I'm a tooltip!`;
	export let touch = true;
	export let className = 'flex';

	let tooltipElement;
	let tooltipInstance;

	$: if (tooltipElement && content) {
		if (tooltipInstance) {
			tooltipInstance.setContent(content);
		} else {
			tooltipInstance = tippy(tooltipElement, {
				animation:'shift-toward-subtle',
				content: content,
				placement: placement,
				allowHTML: true,
				touch: touch
			});
		}
	} else if (tooltipInstance && content === '') {
		if (tooltipInstance) {
			tooltipInstance.destroy();
		}
	}

	onDestroy(() => {
		if (tooltipInstance) {
			tooltipInstance.destroy();
		}
	});
</script>

<div bind:this={tooltipElement} aria-label={content} class={className}>
	<slot />
</div>
