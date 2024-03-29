@isTest
public class ScoreChartControllerTest {
    @isTest static void testGetIndustryScoreFFEnabled() {
        FeatureFlags flags = new FeatureFlags();
        FeatureFlags.setMockValue('simpleRustWs', true);

        // Arrange
        Test.setMock(HttpCalloutMock.class, new IndustryScoreHttpCalloutMock());

        // Act
        Integer score = ScoreChartController.getIndustryScore('Technology');

        // Assert
        System.assertEquals(100, score, 'Parameters doesn\'t match');
    }

    @isTest static void testGetIndustryScoreFFDisabled() {
        FeatureFlags flags = new FeatureFlags();
        FeatureFlags.setMockValue('simpleRustWs', false);
        
        // Arrange
        Test.setMock(HttpCalloutMock.class, new IndustryScoreHttpCalloutMock());

        // Act
        Integer score = ScoreChartController.getIndustryScore('Technology');

        // Assert
        System.assertEquals(ScoreChartController.DEFAULT_MEDIA_SCORE, score, 'Parameters doesn\'t match');
    }

    public class IndustryScoreHttpCalloutMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('100');
            res.setStatusCode(200);
            return res;
        }
    }
}