public with sharing class ScoreChartController {
    public static final Integer DEFAULT_MEDIA_SCORE = 15;

    @AuraEnabled
    public static Integer getIndustryScore(String industry) {
        Integer score;
        FeatureFlags flags = new FeatureFlags();
        if(flags.evaluate('simpleRustWs').isEnabled()){
            String endpoint = 'https://simplewsrust.onrender.com/' + industry;

            HttpRequest req = new HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');

            Http http = new Http();
            HttpResponse res = http.send(req);
            try {
                score = Integer.valueOf(res.getBody());
            } catch (Exception e) {
                throw new AuraHandledException('Unexpected value:' + res.getBody() + ' ' + industry);
            }
        } else {
            score = DEFAULT_MEDIA_SCORE;
        }

        return score;
    }
}