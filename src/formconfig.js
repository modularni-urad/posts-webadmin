import tagsField from './components/tags.js'

export default [{
  name: 'id',
  label: "#",
  fieldcomponent: true, sortable: true
}, {
  name: 'title',
  component: "dyn-input",
  label: 'název',
  rules: "required",
  fieldcomponent: true, sortable: true
}, {
  name: 'slug',
  label: 'slug'
}, {
  name: 'tags',
  component: "dyn-input",
  label: 'tagy',
  fieldcomponent: tagsField, sortable: true
}, {
  name: 'image',
  component: "dyn-input",
  label: 'obrázek'
}, {
  name: 'perex',
  component: "dyn-textarea",
  label: 'perex',
  rules: "required"
}, {
  name: 'content',
  component: "dyn-textarea",
  label: 'obsah',
  rules: "required"
}, {
  name: 'published',
  component: "dyn-date",
  label: "publikováno",
  fieldcomponent: true, sortable: true
}, {
  name: 'author',
  label: "autor",
  fieldcomponent: true, sortable: true
}, {
  name: 'status',
  label: "status",
  fieldcomponent: true, sortable: true
}]