<script lang="ts">
    import { Popover} from "bits-ui";
</script>

<Popover.Root>
    <Popover.Trigger>
        <slot/>
    </Popover.Trigger>
    <Popover.Content>
        <slot/>
    </Popover.Content>
</Popover.Root>