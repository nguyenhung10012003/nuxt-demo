<template>
  <div>
    <Nav/>
    <div class="mt-4 max-w-[900px] mx-auto px-5">
      
      <slot/>
    </div>
    <Toaster/>
  </div>
</template>

<script>
import Nav from "~/components/Nav.vue";
import Toaster from "~/components/ui/toast/Toaster.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb/index.ts";
import AppBreadCrumb from "~/components/AppBreadCrumb.vue";

export default {

  components: {
    AppBreadCrumb,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbLink,
    BreadcrumbItem,
    BreadcrumbList,
    Breadcrumb,
    Nav,
    Toaster
  },
}
</script>