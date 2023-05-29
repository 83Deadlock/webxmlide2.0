<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text"/>

  <xsl:template match="/">
    <xsl:apply-templates select="bookstore/book"/>
  </xsl:template>

  <xsl:template match="book">
    <xsl:value-of select="concat(title, ' (', year, ') - ', title/@lang)" disable-output-escaping="yes"/>
    <xsl:text>&#10;</xsl:text>
    <xsl:apply-templates select="author"/>
    <xsl:text>&#10;</xsl:text>
    <xsl:value-of select="price" disable-output-escaping="yes">
      <xsl:attribute name="style">font-weight: bold;</xsl:attribute>
    </xsl:value-of>
    <xsl:text>&#10;</xsl:text>
    <xsl:text>--------------</xsl:text>
    <xsl:text>&#10;</xsl:text>
  </xsl:template>

  <xsl:template match="author">
    <xsl:value-of select="concat(normalize-space(.), ';')" disable-output-escaping="yes">
      <xsl:attribute name="style">font-style: italic;</xsl:attribute>
    </xsl:value-of>
  </xsl:template>

</xsl:stylesheet>
