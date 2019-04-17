module.exports = {
  // custom for project

  // palette
  'blue-6': '#1890ff',                                // primary state
  'green-6': '#52c41a',                               // success state color
  'gold-6': '#faad14',                                // warning state color
  'red-6': '#f5222d',                                 // error state color

  'disabled-color': 'rgba(0, 0, 0, .25)',             // disable state
  'heading-color': 'rgba(0, 0, 0, .85)',              // heading text color
  'text-color': 'rgba(0, 0, 0, .65)',                 // primary text color
  'text-color-secondary': 'rgba(0, 0, 0, .45)',       // secondary text color
  'text-color-inverse': '#ffffff',                    // inverse text color

  'link-color': '#1890ff',                            // link color

  // shape
  'border-radius-base': '4px',                        // border radius
  'border-radius-sm': '2px',                          // border sm radius
  'border-color-base': '#d9d9d9',                     // border color

  // zIndex
  'zindex-affix': '10',                               // index for affix
  'zindex-back-top': '10',                            // index for backTop
  'zindex-badge': '10',                               // index for badge
  'zindex-picker-panel': '10',                        // index for picker
  'zindex-popup-close': '10',                         // index for popup
  'zindex-table-fixed': '20',                         // index for table
  'zindex-modal': '1000',                             // index for modal
  'zindex-modal-mask': '1000',                        // index for mask
  'zindex-message': '1010',                           // index for message
  'zindex-notification': '1010',                      // index for notification
  'zindex-popover': '1030',                           // index for popover
  'zindex-dropdown': '1050',                          // index for dropdown
  'zindex-picker': '1050',                            // index for picker
  'zindex-tooltip': '1060',                           // index for tooltip

  // breakpoints
  'padding-lg': '24px',                               // containers
  'padding-md': '16px',                               // small containers and buttons
  'padding-sm': '12px',                               // Form controls and items
  'padding-xs': '8px',                                // small items

  // mixins
  'screen-xs': '480px',                               // Extra small screen / phone
  'screen-sm': '576px',                               // Small screen / tablet
  'screen-md': '768px',                               // Medium screen / desktop
  'screen-lg': '992px',                               // Large screen / wide desktop
  'screen-xl': '1200px',                              // Extra large screen / full hd
  'screen-xxl': '1600px',                             // Extra extra large screen / large desktop

  // shadows
  'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',  // shadow for layers
  'shadow-1-up': '0 -2px 8px rgba(0, 0, 0, 0.15)',    // shadow up for layers
  'shadow-1-down': '0 2px 8px rgba(0, 0, 0, 0.15)',   // shadow down for layers
  'shadow-1-left': '-2px 0 8px rgba(0, 0, 0, 0.15)',  // shadow left for layers
  'shadow-1-right': '2px 0 8px rgba(0, 0, 0, 0.15)',  // shadow right for layers
  'shadow-2': '0 4px 12px rgba(0, 0, 0, 0.15)',       // shadow max for layers

  'btn-shadow': '0 2px 0 rgba(0, 0, 0, 0.015)',       // shadow for btn
  'btn-primary-shadow': '0 2px 0 rgba(0, 0, 0, 0.045)', // shadow primary for btn
  'btn-text-shadow': '0 -1px 0 rgba(0, 0, 0, 0.12)',  // shadow text for btn

  'card-shadow': '0 2px 8px rgba(0, 0, 0, 0.09)',     // shadow for card

  // typography
  'font-size-lg': '16px',
  'font-size-base': '14px',                           // h5/text font size
  'font-size-sm': '12px',                             // text sm font size
  'heading-1-size': '38px',                           // h1 sm font size
  'heading-2-size': '30',                             // h2 sm font size
  'heading-3-size': '24px',                           // h3 sm font size
  'heading-4-size': '20px',                           // h4 sm font size
  'line-height-base': 1.5,                            // text line-height

  'body-background': '#ffffff',                       // body color
  'component-background': '#ffffff',                  // component color

  'btn-font-weight': 400,                             // btn font color
  'btn-height-base': '32px',                          // btn-height-base
  'btn-height-lg': '40px',                            // btn-height-lg
  'btn-height-sm': '24px',                            // btn-height-sm

  'checkbox-size': '16px',                            // checkbox-size
  'radio-size': '16px',                               // radio-size

  'layout-body-background': '#f0f2f5',                // layout-body-background
  'layout-header-background': '#001529',              // layout-header-background
  'layout-header-height': '64px',                     // layout-header-height
  'layout-header-padding': '0 50px',                  // layout-header-padding
  'layout-footer-padding': '24px 50px',               // layout-footer-padding

  'form-item-margin-bottom': '24px',                  // form-item-margin-bottom
  'form-item-trailing-colon': 'true',                 // form-item-trailing-colon
  'form-vertical-label-padding': '0 0 8px',           // form-vertical-label-padding
  'form-vertical-label-margin': '0',                  // form-vertical-label-margin

  'input-height-base': '32px',                        // input-height-base
  'input-height-lg': '40px',                          // input-height-lg
  'input-height-sm': '24px',                          // input-height-sm

  'select-item-selected-font-weight': 600,            // select-item-selected-font-weight

  'tooltip-max-width': '250px',                       // tooltip-max-width
  'tooltip-color': '#fff',                            // Tooltip text color
  'tooltip-bg': 'rgba(0, 0, 0, 0.75)',                // Tooltip background color

  'popover-bg': '#fff',                               // popover-bg

  'menu-inline-toplevel-item-height': '40px',         // menu-inline-toplevel-item-height
  'menu-item-height': '40px',                         // menu-item-height
  'menu-collapsed-width': '80px',                     // menu-collapsed-width

  'table-padding-vertical': '16px',                   // table-padding-vertical
  'table-padding-horizontal': '16px',                 // table-padding-horizontal


  'card-head-padding': '16px',                        // card-head-padding
  'card-inner-head-padding': '12px',                  // card-inner-head-padding
  'card-padding-base': '24px',                        // card-padding-base
  'card-padding-wider': '32px',                       // card-padding-wider
  'card-background': '#cfd8dc',                       // card-background

  'tree-title-height': '24px',                        // tree-title-height
  'tree-child-padding': '18px',                       // tree-child-padding
  'tree-directory-selected-color': '#fff',            // tree-directory-selected-color

  'avatar-size-base': '32px',                         // avatar-size-base
  'avatar-size-lg': '40px',                           // avatar-size-lg
  'avatar-size-sm': '24px',                           // avatar-size-sm
  'avatar-font-size-base': '18px',                    // avatar-font-size-base
  'avatar-font-size-lg': '24px',                      // avatar-font-size-lg
  'avatar-font-size-sm': '14px',                      // avatar-font-size-sm
  'avatar-bg': '#ccc',                                // avatar-bg
  'avatar-color': '#fff',                             // avatar-color

  'tabs-card-height': '40px',                         // tabs-card-height
  'tabs-bar-margin': '0 0 16px 0',                    // tabs-bar-margin
  'tabs-horizontal-margin': '0 32px 0 0',             // tabs-horizontal-margin
  'tabs-horizontal-padding': '12px 16px',             // tabs-horizontal-padding
  'tabs-horizontal-padding-lg': '16px',               // tabs-horizontal-padding-lg
  'tabs-horizontal-padding-sm': '8px 16px',           // tabs-horizontal-padding-sm
  'tabs-vertical-padding': '8px 24px',                // tabs-vertical-padding
  'tabs-vertical-margin': '0 0 16px 0',               // tabs-vertical-margin
  'tabs-scrolling-size': '32px',                      // tabs-scrolling-size


  'badge-height': '20px',                             // badge-height
  'badge-dot-size': '6px',                            // badge-dot-size
  'badge-font-weight': 'normal',                      // badge-font-weight
  'badge-status-size': '6px',                         // badge-status-size
};
