<template>
    <div class="navigation" aria-label="Main Navigation">
        <ul id="menu" class="dropdown-menu">
          <li v-for="(category, i) in categories" :key="i" @click="clickOnCategory(category)">
            <g-link to="/products">{{ category.name }}</g-link>
          </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavBar',
  computed: mapGetters(['categories']),
  data() {
    return {
      burgerActive: false,
    }
  },
  methods: {
    clickOnCategory(category) {
      this.filter(category)
    },
     ...mapActions(['filter']),
  },
}
</script>

<static-query>
query {
     categories: allPrismicCategory {
        edges {
            node {
                data {
                    title
                }
            }
        }
    }
}
</static-query>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  background: $wintergreen-dream;
  min-height: 64px;
  border-bottom: 1px solid darken($wintergreen-dream, 20);
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  li {
    display: inline;
  }
  .hamburger {
    position: absolute;
    top: 17px;
    right: 13px;
    padding: 7px 3px 0 0;
    // prettier-ignore
    @include responsive('display', (xs: block, m: none));
    &:focus {
      outline: 1px solid;
    }
  }
  .hamburger[aria-expanded='true'] + .dropdown-menu {
    display: block;
  }
}
.nav__link {
  margin-left: 20px;
}
.dropdown-menu {
  list-style: none;
  line-height: 2;
  left: 0;
  height: auto;
  a {
    display: inline-block;
    margin: 0 11px 0 0;
    padding: 0 8px;
    font-weight: 900;
    letter-spacing: 0.01em;
    font-size: 16px;
    color: $white;
    text-decoration: none;
    position: relative;
    z-index: 1;
    text-transform: capitalize;
    &:focus {
      outline: none;
    }
    @include hover-supported() {
      &:after {
        top: 0;
      }
    }
  }
}
</style>