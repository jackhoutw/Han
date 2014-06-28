define([
  './method',
  './regex/unicode',
  './regex/typeset',
  './farr',
  './core',
  './hyu',
  './mre',
  './guy'
], function( $, UNICODE, TYPESET, Farr, Han, Hyu, Mre, Guy ) {

  /**
   * API: regular expression
   */
  $.extend( Han, {
    UNICODE: UNICODE,
    TYPESET: TYPESET
  })

  // English aliases are easier dealing with
  $.extend( Han.UNICODE, {
    greek: Han.UNICODE.ellinika,
    cyrillic: Han.UNICODE.kirillica
  })

  // Lock the regex objects preventing from furthur
  // modification.
  Object.freeze( Han.UNICODE )
  Object.freeze( Han.TYPESET )

  /**
   * Shortcut for render by routine
   */
  Han.renderByRoutine = function() {
    return Han().renderByRoutine()
  }

  /**
   * Farr Methods
   */
  Han.Farr = Farr

  ;[ 'replace', 'wrap', 'unfarr', 'jinzify', 'charify' ]
  .forEach(function( method ) {
    Han.fn[ method ] = function() {
      if ( !this.Farr ) {
        // Share the same selector
        this.Farr = Han.Farr( this.context )
      }

      this.Farr[ method ]( arguments[0], arguments[1] )
      return this
    }
  })

  /**
   * Normalisation rendering mechanism via Hyu
   */
  Han.normalize = Hyu
  Han.support = Hyu.support
  Han.detectFont = Hyu.detectFont

  $.extend( Han.fn, {
    initCond: function() {
      this.condition.classList.add( 'han-js-rendered' )
      Han.normalize.initCond( this.condition )
      return this
    }
  })

  ;[ 'Elem', 'Line', 'Em', 'Ruby' ]
  .forEach(function( elem ) {
    var
      method = 'render' + elem
    ;
    Han.fn[ method ] = function( target ) {
      Han.normalize[ method ]( this.context, target )
      return this
    }
  })

  /**
   * Typography improvement via Mre
   */
  Han.typeface = Mre
  $.extend( Han.support, Mre.support )

  /**
   * Advanced typesetting features via Guy
   */
  Han.typeset = Guy

  ;[ 'HWS' ]
  .forEach(function ( feature ) {
    var
      method = 'render' + feature
    ;
    Han.fn[ method ] = function( option ) {
      Han.typeset[ method ]( this.context, option )
      return this
    }
  })
})
